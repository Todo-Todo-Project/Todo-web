import { Col, Container, Navbar, Row, ThemeProvider } from 'react-bootstrap';
import { register } from './actions';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Register() {
  const navigate = useNavigate();
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
    <Container className="container"> 
        <Row>
          <Col className='screen'>
              <div className='screen_content'>
                <div className='login'>
                  <div className='title'>Register</div>
                  <Formik
                    initialValues={{ email: '', password: '' }}
                    validate={values => {
                      const errors = {};
                      if (!values.email) {
                        errors.email = 'Required';
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                      ) {
                        errors.email = 'Invalid email address';
                      }
                      return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                      await register(values.email, values.password);
                      navigate('/login');
                    }}
                  >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                      }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="login_field" >
                          <input className='input'
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email"
                          />
                          {errors.email && touched.email && errors.email}
                        </div>
                        <div className="login_field" >
                          <input className='input'
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                          />
                          {errors.password && touched.password && errors.password}
                          
                          <p>Already have an account? <a href="/login">Login!</a></p>
                          <button className="btn-summit" type="submit" disabled={isSubmitting}>
                            Register
                          </button>
                        </div>
                      </form>
                  )}
                  </Formik>
                </div>
              </div>
            <div className="screen_background">
              <span className="background_shape shape4"></span>
              <span className="background_shape shape3"></span>		
              <span className="background_shape shape2"></span>
              <span className="background_shape shape1"></span>
           </div>		
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default Register;
