import Papa from "papaparse";

type Row = {
  scraper: string;
  mailto?: string | null;
  tel?: string | null;
  href?: string | null;
};

export async function scrapeService(csvBuffer: Buffer) {
  // Parse CSV
  const csvData = csvBuffer.toString("utf-8");
  const { data: rows } = Papa.parse<Row>(csvData, { header: true });

  let hasScaper = false;
  // Check if "scraper" exists in one row
  for (const row of rows) {
    if (row.hasOwnProperty("scraper")) {
      hasScaper = true;
      break;
    }
  }
  if (!hasScaper) {
    console.error('No column named "scraper"');
  }

  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    try {
      const url: string = rows[i].scraper;

      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "text/html",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36",
        },
      });
      const html = await data.text();

      // Regex for e-mails
      const emailRegex1 =
        /href="mailto:+[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,3}"/;
      let mailtoMatch = html.match(emailRegex1);
      if (!mailtoMatch) {
        const emailRegex2 =
          /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        mailtoMatch = html.match(emailRegex2);
      }
      const mailResult = mailtoMatch?.map((email) => {
        return email.replace('href="mailto:', "").replace('"', "");
      });

      // Regex for telephone numbers
      let telMatch = html.match(/href=["']tel:([^"']*)["']/i);
      const telRegex = /\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d/;
      if (!telMatch) {
        telMatch = html.match(telRegex);
      }
      const telResult = telMatch?.map((tel) => {
        return tel.replace('href="tel:', "").replace('"', "");
      });

      // Regex for URLs
      const urlRegex = new RegExp(
        '\\bhref="https?:\\/\\/[^s/$.?#]+(\\.[^s/$.?#]+)*"'
      );
      const urlMatches = html.match(urlRegex) || [];
      // Find the least frequent URL
      const urlFrequency = urlMatches.reduce((acc: any, url) => {
        acc[url] = (acc[url] || 0) + 1;
        return acc;
      }, {});

      let minFrequency = Infinity;
      let leastFrequentUrl = null;

      for (const url in urlFrequency) {
        if (urlFrequency[url] < minFrequency) {
          minFrequency = urlFrequency[url];
          leastFrequentUrl = url;
        }
      }
      const hrefMatch = leastFrequentUrl;
      const hrefResult = hrefMatch?.replace('href="', "").replace('"', "");

      if (mailResult && mailResult.length > 0) {
        rows[i].mailto = mailResult[0];
      }
      if (telResult && telResult.length > 0) {
        rows[i].tel = telResult[0];
      }
      if (hrefResult && hrefResult.length > 0) {
        rows[i].href = hrefResult;
      }
    } catch (error) {
      console.error(`Error scraping row ${i}:`, error);
    }
  }
  // Convert rows back to CSV
  const csvResult = Papa.unparse(rows);

  return csvResult;
}
