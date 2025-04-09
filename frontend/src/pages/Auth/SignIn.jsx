import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import CustomTextInput from "../../../@manush/elements/Input/CustomTextInput/CustomTextInput.jsx";
import CustomPasswordInput from "../../../@manush/elements/Input/CustomPasswordInput/CustomPasswordInput.jsx";
import SubmitButton from "../../../@manush/elements/button/SubmitButton/SubmitButton.jsx";
import Validator from "../../../utilities/Validator.js";
import { logInUser } from "../../../services/authManagement/authService.js";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/authReducer.js";
import useNotiStack from "../../../@manush/hooks/useNotifyStack.js";

const SignIn = (factory, deps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const { successStack, errorStack } = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      email: Validator.email(),
      password: Validator.string("Password"),
    });
  }, deps);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await logInUser(data);
      successStack("Sign in Successfully", "success");
      const { tokenId, user, modules, accessToken, refreshTokenId } =
        response?.data;

      localStorage.setItem("tokenId", tokenId);

      dispatch(
        authActions.signin({
          user,
          modules,
          accessToken,
          refreshTokenId,
        }),
      );

      navigate("/dashboard");
    } catch (err) {
      errorStack(err.response?.data?.message || "Sign in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Paper
          elevation={3}
          sx={{ mt: 5, p: 3, width: "100%", borderRadius: 2 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
            <Grid container spacing={3}>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomTextInput
                  required
                  id="email"
                  control={control}
                  label={"Email"}
                  errorInstance={errors}
                  register={register}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: "100%" }}>
                <CustomPasswordInput
                  required
                  id="password"
                  register={register}
                  label={"Password"}
                  control={control}
                  errorInstance={errors}
                  isLabelUp={true}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                paddingTop: "20px",
              }}
            >
              <SubmitButton isSubmitting={isSubmitting} label={"Submit"} />
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignIn;
