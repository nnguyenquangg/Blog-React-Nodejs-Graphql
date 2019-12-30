import React, { useState , useContext} from "react"
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useForm } from "../untils/hooks";
import { AuthContext  } from "./../untils/auth";
function Login(props) {
    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: '',
    });

    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(
            _,
            {
                data: { login: userData }
            }
        ) {
            context.login(userData);
            
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        LoginUser();
    }

    return (
        <div className="form-container">
            <Form onSubmit={(e) => onSubmit(e)} noValidate className={loading ? 'loading' : ''}>
                <h1 >Login</h1>
                <Form.Input
                    label="Usermame"
                    placeholder="Username"
                    name="username"
                    type="text"
                    error={errors.username ? true : false}
                    value={values.username}
                    onChange={(e) => onChange(e)}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    error={errors.password ? true : false}
                    value={values.password}

                    onChange={(e) => onChange(e)}
                />

                <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">{
                        Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))
                    }</ul>
                </div>

            )}
        </div>

    )
}
const LOGIN_USER = gql`
    mutation login(
        $username : String!
        $password : String!
    ){
        login(
              username : $username
                password : $password   
        ){
            id 
            email
            username
            createAt
            token
            
        }
    }
`
export default Login