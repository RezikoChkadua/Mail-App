import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLinkBase = styled(Link)<{ active: boolean }>`
  width: 100%;
  text-decoration: none;
  color: ${({ active }) => (active ? "#1976d2" : "#111")};
  cursor: pointer;
`;
