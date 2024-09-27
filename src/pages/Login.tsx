import { useAuth } from 'hooks/useAuth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'components/ui/Navbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = () => {
    const { isLoading, sendSubmit, handleInputChange, errors, username, password } = useAuth()

    return (
        <section className='h-100vh d-flex flex-column container-login'>
        <Navbar/>
        <section className='d-flex align-items-center h-100vh'>
            <Form className='w-50 m-auto sm-w-90' onSubmit={sendSubmit}> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="font-600">User</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter user"  
                    name="username" 
                    value={username}
                    onChange={handleInputChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="font-600">Password</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Password"  
                    onChange={handleInputChange}
                    name="password" 
                    value={password}
                />
                </Form.Group>
                {errors && <p className='text-danger'>{errors}</p>}
                <Button className="font-600 bg-primary px-4 d-flex gap-2" type="submit" disabled={isLoading}>
                    {
                        isLoading && 
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress color="inherit" size="20px"/>
                        </Box>
                    }
                    Login
                </Button>
            </Form>
        </section>
        </section>
    )
}

export default Login