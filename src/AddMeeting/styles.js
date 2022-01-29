import styled from "styled-components";

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 30em;
  width: 30em;
  border: 1px solid #eee;
  padding: 1em;
  justify-content: space-between;
`;

export const ElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  align-items: flex-start;
  padding: 1em;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 0.8em;
`;

export const NextBtn = styled.nav`
  align-self: stretch;
  text-align: center;
  padding: 1em;
  background-color: blue;
  color: white;
`;
