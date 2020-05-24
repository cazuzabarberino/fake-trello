import styled from "styled-components";

export const CardContent = styled.div`
  width: 272px;
  max-height: 100%;
  padding: 0 4px;

  & + div {
    margin-left: 8px;
  }

  display: flex;
  flex-direction: column;

  background: #ebecf0;
  font-size: 14px;
  border-radius: 4px;
`;

export const CardHeader = styled.div`
  padding: 12px 8px;
  color: #172b4d;
  font-weight: 700;
`;

export const NewTaskBtn = styled.div`
  display: flex;
  padding: 12px 8px;
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 4px 8px 4px;
  flex: 1 1 auto;
  overflow-y: auto;
`;
