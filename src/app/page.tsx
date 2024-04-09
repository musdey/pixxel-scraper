'use client'
// pages/login.js
import { Backdrop, Box, Button, CircularProgress, Container, Divider, FormControl, Grid, IconButton, Input, InputLabel, ListItem, TextField, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import matrixImg from '@/public/matrix.jpg'
import { containerStyle } from '@/components/containerstyle';
import StyledTextField from '@/components/StyledTextfield';

const HomePage = () => {
    const router = useRouter();
    const [showEmail, setShowEmail] = useState(false);
    const [loading, setLoading] = useState(false);
    const [csv, setCsv] = useState<string | null>(null);
    const [csvName, setCsvName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [emailValid, setEmailValid] = useState<boolean>(false);

    const submit = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('file', new Blob([csv as string]));
        formData.append('email', email);

        const response = await fetch('/api', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            router.push('/success');
        } else {
            console.error('Error submitting form');
        }

        setLoading(false)
    }

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.onloadend = () => {
                const csvData = reader.result;
                setCsv(csvData as string);
                setCsvName(file.name);
                setShowEmail(true);
            };
            reader.readAsText(file);
            event.target.value = '';
        }
    };

    const removeFileUpload = () => {
        setCsv(null);
        setCsvName("");
        setShowEmail(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setEmailValid(validateEmail(event.target.value));
    }

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    return (
        <Container style={containerStyle}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container>
                {/* Left side with image */}
                <Grid item xs={4} >
                    <Box style={{
                        position: 'relative',
                        width: '100%',
                        height: '100vh'
                    }}>
                        <Image src={matrixImg} alt="matrixImg" layout="fill" objectFit="cover" />
                    </Box>
                </Grid>
                {/* Right side with login form */}
                <Grid item container xs={8} style={{
                    textAlign: '-webkit-center' as 'center',
                    height: '90vh',
                    placeContent: 'center',
                }}>
                    <Grid item width={600}>
                        <Box mt={2}>
                            <Typography fontWeight={900} fontSize={40} align="center">
                                Free CSV data scraper
                            </Typography>
                        </Box>
                        <Box mt={2}>
                            <Typography fontWeight={900} fontSize={26} align="center">
                                Upload CSV. Make sure the first column is called scraper and contains the URLs
                            </Typography>
                        </Box>
                        <Grid item justifyContent="center">
                            <InputLabel color="primary" variant='outlined' htmlFor="outlined-basic">Upload CSV</InputLabel>

                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height={200}
                                width={400}
                                border={5}
                                borderColor="black"
                            >
                                {!csv ?
                                    <Button
                                        component="label"
                                        role={undefined}
                                        color="primary"
                                        variant="contained"
                                        tabIndex={-1}
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                        <input
                                            type="file"
                                            hidden // Versteckt das Standard-Datei-Upload-Steuerelement
                                            onChange={handleFileUpload}
                                            accept=".csv" // Erlaubt nur das Hochladen von Bildern
                                            capture// Öffnet die Kamera auf Mobilgeräten
                                        />
                                    </Button>
                                    :
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                        <ListItem style={{ placeContent: "center", padding: "unset" }}>
                                            <a style={{ textDecoration: 'underline', color: 'inherit', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                                download={csvName}
                                                href={URL.createObjectURL(new Blob([csv]))}
                                            >
                                                <Typography fontWeight={900} fontSize={18} align="center">
                                                    {csvName}
                                                </Typography>
                                            </a>
                                            <IconButton
                                                aria-label="remove"
                                                size="small"
                                                onClick={(e) => removeFileUpload()}
                                            >
                                                <CloseIcon color='primary' />
                                            </IconButton>
                                        </ListItem>
                                    </div>
                                }

                            </Box>
                        </Grid>
                        {showEmail &&
                            <Box display={"flex"}>
                                <StyledTextField onChange={handleChange} value={email} required name='email' label='Email' fullWidth margin='normal' type='email' variant='filled' />
                                <Button onClick={submit} variant='contained' disabled={!emailValid}>Get Scraped Data </Button>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    );
};

export default HomePage;