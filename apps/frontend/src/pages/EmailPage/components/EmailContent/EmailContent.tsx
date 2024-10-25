import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "store/store";
import { fetchMail } from "store/slices/mailSlice";
import { Container, DownloadLink } from "./EmailContent.styled";
import { Attachments } from "store/types";

export default function EmailContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let { id } = useParams();
  const { mail } = useSelector((state: RootState) => state);

  const passedState = location.state;

  useEffect(() => {
    if (!id || !!mail) return;
    dispatch(fetchMail(id));
  }, [dispatch, id]);

  const data = !!passedState ? passedState : mail;

  return (
    <Container>
      <Box>
        <IconButton onClick={() => navigate(`/`)}>
          <ArrowBackIcon color="primary" />
        </IconButton>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" alignItems="center" gap="5px">
          <Typography fontSize={"12px"} color="#c7c7c7">
            Subject:
          </Typography>
          <Typography fontSize={"20px"} color="#3642ff">
            {data?.subject}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="5px">
          <Typography fontSize={"12px"} color="#c7c7c7">
            To:
          </Typography>
          <Typography fontSize={"20px"} color="#3642ff">
            {data?.recipient}
          </Typography>
        </Box>
      </Box>
      <Box
        width="100%"
        height="100%"
        display="flex"
        justifyContent="center"
        textAlign="center"
      >
        <Typography>{data.body}</Typography>
      </Box>
      {data?.attachments?.length ? (
        <Box
          display="flex"
          marginTop="auto"
          alignItems="center"
          flexDirection="column"
        >
          Attachments:
          {data?.attachments?.map((item: Attachments) => (
            <Typography ml="5px" color="primary" sx={{ cursor: "pointer" }}>
              <DownloadLink
                target="_blank"
                href={`http://localhost:3000/download/${item?.filename}`}
              >
                {item?.original_name}
              </DownloadLink>
            </Typography>
          ))}
        </Box>
      ) : null}
    </Container>
  );
}
