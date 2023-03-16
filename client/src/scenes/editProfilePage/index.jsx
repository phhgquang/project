import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  BadgeOutlined,
  EditOutlined,
  AddAPhotoOutlined,
} from "@mui/icons-material";
import Navbar from "scenes/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { setUser } from "state";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  TextField,
  Button,
} from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
const EditProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const { userId } = useParams();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const firstname = `${user.firstName}`;
  const lastname = `${user.lastName}`;
  const occupation = `${user.occupation}`;
  const location = `${user.location}`;
  const picturePath = `${user.picturePath}`;
  const dispatch = useDispatch();

//   console.log(typeof user.picturePath);

  const initialValues = {
    firstName: firstname,
    lastName: lastname,
    location: location,
    occupation: occupation,
    picture: "",
  };

  const edit = async (values, onSubmitProps) => {
    debugger;
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    if (values.picture.name !== undefined) {
        formData.append("picturePath", values.picture.name);
    }
    
    const savedUserResponse = await fetch(
      `http://localhost:3001/users/${userId}/edit`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    dispatch(setUser(savedUser))
    navigate("/home");
  };

  const formSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    edit(values, onSubmitProps);
  };
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* <Box flexBasis={isNonMobileScreens ? "26%" : undefined}></Box> */}
        <Box
          flexBasis={isNonMobileScreens ? "57%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <WidgetWrapper m="2rem 0">
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              paddingBottom="20px"
            >
              Edit your profile
            </Typography>
            <Formik
              onSubmit={handleFormSubmit}
              validationSchema={formSchema}
              initialValues={initialValues}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      mb="0.5rem"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <BadgeOutlined fontSize="large" sx={{ color: main }} />
                      <Typography width={"100px"} color={medium}>First Name</Typography>
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={
                          Boolean(touched.firstName) && Boolean(errors.firstName)
                        }
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      mb="0.5rem"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <BadgeOutlined fontSize="large" sx={{ color: main }} />
                      <Typography width={"100px"} color={medium}>Last Name</Typography>
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={
                          Boolean(touched.lastName) && Boolean(errors.lastName)
                        }
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      mb="0.5rem"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <LocationOnOutlined
                        fontSize="large"
                        sx={{ color: main }}
                      />
                      <Typography width={"100px"} color={medium}>Location</Typography>
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.location}
                        name="location"
                        error={
                          Boolean(touched.location) && Boolean(errors.location)
                        }
                        helperText={touched.location && errors.location}
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      mb="0.5rem"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: main }}
                      />
                      <Typography width={"100px"} color={medium}>Occupation</Typography>
                      <TextField
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.occupation}
                        name="occupation"
                        error={
                          Boolean(touched.occupation) &&
                          Boolean(errors.occupation)
                        }
                        helperText={touched.occupation && errors.occupation}
                      />
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      gap="1rem"
                      mb="0.5rem"
                      sx={{ gridColumn: "span 4" }}
                    >
                      <AddAPhotoOutlined
                        fontSize="large"
                        sx={{ color: main }}
                      />
                      <Typography width={"100px"} color={medium}>Avartar</Typography>
                      <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                          setFieldValue("picture", acceptedFiles[0])
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Box
                            {...getRootProps()}
                            border={`2px dashed ${palette.primary.main}`}
                            p="1rem"
                            sx={{ "&:hover": { cursor: "pointer" } }}
                          >
                            <input {...getInputProps()} />
                            {!values.picture ? (
                              <FlexBetween>
                                <Typography>{picturePath}</Typography>
                                <EditOutlined />
                              </FlexBetween>
                            ) : (
                              <FlexBetween>
                                <Typography>{values.picture.name}</Typography>
                                <EditOutlined />
                              </FlexBetween>
                            )}
                          </Box>
                        )}
                      </Dropzone>
                    </Box>
                  </Box>
                  <Box>
                    <Button
                      fullWidth
                      type="submit"
                      sx={{
                        m: "2rem 0",
                        p: "1rem",
                        backgroundColor: palette.primary.main,
                        color: palette.background.alt,
                        "&:hover": { color: palette.primary.main },
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </WidgetWrapper>
        </Box>
        <Box alignItems="center" flexBasis="32%">
          <Box m="2rem 0">
            <img
              width={"440px"}
              height="440px"
              alt="user"
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
