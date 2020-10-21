import React from "react";
import styled from 'styled-components';
import {deviceMax, SYellowButton} from "../Primitives";
import {Field, Form} from "react-final-form";
import {required} from "../../utils/validators";
import {GeneralLayout} from "../layout";
import {unwrapResult} from "@reduxjs/toolkit";
import {Input} from "../common/FormControls/FormControls";
import {authThunkCreator} from "../../store/auth/thunk";
import {useAppDispatch} from "../../store";
import Swal from "sweetalert2";

export const Login: React.FC = () => {

  const dispatch = useAppDispatch();

  function onSubmit(values: {email: string, password: string}) {
    dispatch(authThunkCreator(values))
      .then(unwrapResult)
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: 'Не верный логин или пароль'
        })
      })
  }

  return (
    <GeneralLayout>
      <LoginSection>
        <Container>
          <Title>
            <H1>Вход</H1>
          </Title>
          <Form
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
              <LoginForm onSubmit={handleSubmit}>
                <FieldBlock>
                  <Label>Email</Label>
                  <Field
                    name={'email'}
                    validate={required}
                    component={Input}
                  />
                </FieldBlock>

                <FieldBlock>
                  <Label>Пароль</Label>
                  <Field
                    name={'password'}
                    validate={required}
                    component={Input}
                  />
                </FieldBlock>

                <Buttons>
                  <SYellowButton type={'submit'}>Войти</SYellowButton>
                </Buttons>
              </LoginForm>
            )}
          />
        </Container>
      </LoginSection>
    </GeneralLayout>
  )
}

const Container = styled.div`
  width: 350px;
  min-height: 336px;
  background: #FFFFFF;
  box-shadow: 0px 20px 20px rgba(40, 40, 40, 0.05);
  border-radius: 10px;
  padding: 0px 16px;
  box-sizing: border-box;
  
  display: flex;
  flex-direction: column;
  
  @media ${deviceMax.mobileL} {
    width: 100%;
  }
`;

const LoginSection = styled.section`
  flex-grow: 1;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  flex: 1 0 auto;
  margin-bottom: 16px;
  margin-top: 10px;
  
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
`;

const H1 = styled.h1`
  margin: 24px 0px;
  font-weight: 300;
  font-size: 22px;
  color: #000000;
  text-align: center;
`;

const FieldBlock = styled.div`
  flex: 0 0 auto;
  margin-top: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #828282;
`;

const Buttons = styled.div`
  flex: 1 0 auto;
  
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;