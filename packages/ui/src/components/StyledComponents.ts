import styled from '@emotion/styled';

export const NowrapBlock = styled.span<{ maxWidth: number; fixed?: boolean }>`
  display: inline-block;
  width: ${({ fixed, maxWidth }) => (fixed ? maxWidth : undefined)}px;
  max-width: ${({ maxWidth }) => maxWidth}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const AnchorBtn = styled.a<{ primary?: boolean; danger?: boolean }>`
  font-size: 14px;
  color: ${({ primary, danger }) => (primary ? '#1677ff' : danger ? '#ff4e4f' : '#737373')} !important;
  transition: color 300ms;
  :hover {
    color: ${({ danger }) => (danger ? '#ff7875' : '#1890ff')} !important;
  }
`;
