import React from "react";
import styled from "styled-components";
import {SInput} from "../../Primitives";

const FormControl: React.FC<{
  input: any
  meta: any
}> = ({ input, meta, ...props }) => {
  return (
      <FieldBlock>
        {props.children}
        {meta.touched && meta.error && <span className={'error'}>{meta.error}</span>}
      </FieldBlock>
  )
}

export const Input: React.FC<any> = (props) => {
  const {input, meta, ...restProps} = props;
  return <FormControl {...props}><SInput {...input} {...restProps} /></FormControl>
}

const FieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  
  input {
    width: 100%;
  }

  .error {
    color: red;
  }
`;