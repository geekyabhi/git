import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Button, Form } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import Message from '../Message/index';
import Loader1 from '../Loader/Loader-1/index'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import registerImg from '../../assets/img/register.png'
function Register() {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [error, seterror] = useState(null)

    const dispatch=useDispatch()
    const history=useHistory()

    const userRegister=useSelector(state=>state.userRegister)
    let {loading,error:registerError,userInfo}=userRegister

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo:loginUserInfo}=userLogin

    useEffect(() => {
        if(userInfo || loginUserInfo){
            history.push('/home')
        }
    // eslint-disable-next-line
    }, [userInfo,registerError])


    if(error || registerError){
        setTimeout(() => {
            seterror(null)
        }, 3000);
    }
    
    if(registerError){
        setTimeout(() => {
            registerError= null
        }, 3000);
    }

    const submitRegister=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            seterror('Password Mismatch')
        }else{
            dispatch(register(name,email,password))
        }
    }

    return(
        <div className="container d-flex  justify-content-center align-items-center ">
            <div className={styles.leftSection}>
               <h2 className={styles.logoHeading}>Drive</h2>
               <img src={registerImg} className={styles.registerImg} alt="display_img"/>
            </div>
            
            <div className="form-container my-5 p-4" id="formBox" style={{minWidth:"350px"}}> 
            {error&&<Message variant={'danger'}>{error}</Message>}
            {registerError&&<Message variant={'danger'}>{registerError}</Message>}
                <div className="mt-4" style={{ height: "100%"}}>
                    <Form onSubmit={submitRegister}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Username" required value={name} onChange={(e)=>{setname(e.target.value)}}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required value={email} onChange={(e)=>{setemail(e.target.value)}} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={password} onChange={(e)=>{setpassword(e.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}} />
                        </Form.Group>
                        {
                            loading?<Loader1></Loader1>:
                            <Button type="submit" className={styles.btn} disabled={loading}>
                                Signup
                            </Button>
                        }
                    </Form>
                    <div className="mt-3">
                        <p>Already have an account ? <Link to='/login'>Login</Link></p>
                    </div>
                </div>            
            </div>
        </div>
    )
}

export default Register
