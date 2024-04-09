import { TextField, styled } from "@mui/material";

const StyledTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'rgb(57, 255, 20)',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgb(57, 255, 20)',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgb(57, 255, 20)',
        },
        '&:hover fieldset': {
            borderColor: 'rgb(57, 255, 20)',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'rgb(57, 255, 20)',
        },
    },
    '& .MuiOutlinedInput-input': {
        color: 'rgb(57, 255, 20)',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(57, 255, 20)',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgb(57, 255, 20)',
    },
    '& .MuiInputBase-input::placeholder': {
        color: 'rgb(57, 255, 20)', // Change this to your desired placeholder color
    },
    '& .MuiInputBase-input': {
        color: 'rgb(57, 255, 20)', // Change this to your desired input text color
    },
    '& .MuiInputLabel-root': {
        color: 'rgb(57, 255, 20)', // Change this to your desired label color
    },
    backgroundColor: '#0B3500',
    color: 'rgb(57, 255, 20)',

});

export default StyledTextField;