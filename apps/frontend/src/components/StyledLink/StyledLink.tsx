import { LinkProps } from "react-router-dom";
import { StyledLinkBase } from "./StyledLink.styled";

interface CustomProps {
  active: boolean;
}

type StyledLinkProps = CustomProps & LinkProps;

export default function StyledLink({
  to,
  active,
  ...restProps
}: StyledLinkProps) {
  return <StyledLinkBase to={to} active={active} {...restProps} />;
}
