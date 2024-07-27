// components/Header.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import styled from 'styled-components';

interface HeaderProps {
  onNew: () => void;
  onSave: (event: React.FormEvent<HTMLButtonElement>) => void;
  onDelete: () => void;
  onPrint: () => void;
  onLog: () => void;
  onDraft: () => void;
}

const HeaderWrapper = styled.header`
  .header {
    display: flex;
    justify-content: space-between;
    background-color: #e0c3fc;
    margin-bottom: 1.25rem;
    padding: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow effect */
  }

  .button-group {
    display: flex;
    gap: 0.5rem;
  }
`;

const FormHeader: React.FC<HeaderProps> = ({ onNew, onSave, onDelete, onPrint, onLog, onDraft }) => {
  return (
    <HeaderWrapper>
      <div className="header">
        <div className="button-group">
          <Button variant='ghost' type="button" onClick={onNew}>New</Button>
          <Button variant='ghost' type="submit" onClick={onSave}>Save</Button>
          <Button variant='ghost' type="button" onClick={onDelete}>Delete</Button>
        </div>
        <div className="button-group">
          <Button variant='ghost' type="button" onClick={onPrint}>Print</Button>
          <Button variant='ghost' type="button" onClick={onLog}>Log</Button>
          <Button variant='ghost' type="button" onClick={onDraft}>Draft</Button>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default FormHeader;
