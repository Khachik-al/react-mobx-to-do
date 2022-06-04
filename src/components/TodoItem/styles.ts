import styled from "styled-components";

export const StyledTodoItem = styled.li`
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 4px;
  margin: 10px 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;
`;

export const Done = styled.span`
  color: white;
  background-color: ${(props: { checked: boolean }) => props.checked ? 'green' : 'red'};
  padding: 6px;
  border-radius: 4px;
  cursor: pointer;
`;

