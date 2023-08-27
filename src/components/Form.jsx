import {Container,Form,Image,Row,Col,InputGroup,FormControl,Button,Alert} from "react-bootstrap";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEye,faEyeSlash,faLock,faUser} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync, loginUserAsync} from "../features/Slice";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../config/api";

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    const formData = {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: confirmPassword,
    };
    dispatch(registerUserAsync(formData));

    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Submitting login form...');
    const formData = {
      email: email,
      password: password,
    };
    dispatch(loginUserAsync(formData))
    .then((action) => {
      if (loginUserAsync.fulfilled.match(action)) {
        const token = action.payload.data.token;
        console.log("ini token dari login :", action.payload.data.token);
        setAuthToken(localStorage.setItem("authToken",token))
        navigate('/home');
      }
    });
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Container>
        <div className="text-center mt-3">
          <h4>
            <Image src={logo} /> SIMS PPOB
          </h4>
          {showLogin ? (
            <h4>Masuk atau buat akun untuk memulai</h4>
          ) : (
            <h4>Lengkapi data untuk membuat akun</h4>
          )}
        </div>
        <div style={{ marginTop: "50px" }}>
          <Form className={showLogin ? "d-none" : "d-block"} noValidate>
            <Row>
              <Form.Group
                as={Col}
                md={8}
                className="mb-3"
                controlId="formGroupEmail"
              >
                <Form.Label>Email address</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    placeholder="masukan email anda"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md={8}
                className="mb-3"
                controlId="formGroupFirsName"
              >
                <Form.Label>Nama Depan</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    placeholder="masukan nama depan"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                md={8}
                className="mb-3"
                controlId="formGroupLastName"
              >
                <Form.Label>Nama Belakang</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    placeholder="masukan nama belakang"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                as={Col}
                md={8}
                className="mb-3"
              >
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukan password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text id="password-addon">
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPassword2" as={Col} md={8}>
                <Form.Label>Konfirmasi Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Konfirmasi password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <InputGroup.Text id="password-addon">
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <div className="mt-4 text-center" style={{ width: "65%" }}>
              <Button variant="danger" className="w-100" onClick={handleSubmit}>
                Registrasi
              </Button>
              {/* Render alert berdasarkan status */}
              {users.status === "success" ? (
                <Alert variant="success" className="mt-3">
                {users.message}
                </Alert>
              ) : users.status === "failed" ? (
                <Alert variant="danger" className="mt-3">
                  Registrasi gagal.
                </Alert>
              ) : null}
              <p className="mt-3">
                sudah punya akun? login{" "}
                <span
                  className="text-danger fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLogin(true)}
                >
                  disini
                </span>
              </p>
            </div>
          </Form>
          <Form className={showLogin ? "d-block" : "d-none"} noValidate>
            <Row>
              <Form.Group
                as={Col}
                md={8}
                className="mb-3"
                controlId="formGroupEmail"
              >
                <Form.Label>Email address</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    aria-describedby="inputGroupPrepend"
                    placeholder="masukan email anda"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group
                controlId="formBasicPassword"
                as={Col}
                md={8}
                className="mb-3"
              >
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <FontAwesomeIcon icon={faLock} />
                  </InputGroup.Text>
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukan password"
                    aria-label="Password"
                    aria-describedby="password-addon"
                    minLength={8}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputGroup.Text id="password-addon">
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <div className="mt-3 text-center" style={{ width: "65%" }}>
              <Button variant="danger" className="w-100" onClick={handleLogin}>
                Masuk
              </Button>
              {users.status === "success" ? (
                <Alert variant="success" className="mt-3">
                {users.message}
                </Alert>
              ) : users.status === "failed" ? (
                <Alert variant="danger" className="mt-3">
                {users.error}
                </Alert>
              ) : null}
              <p className="mt-3">
                belum punya akun? registrasi{" "}
                <span
                  className="text-danger fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowLogin(false)}
                >
                  disini
                </span>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};
