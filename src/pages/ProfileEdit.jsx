import React, { useEffect, useState } from "react";
import profile from "../assets/Profile.png";
import { Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {fetchProfile,editProfileAsync,editProfileImageAsync} from "../features/ProfileSlice";
import { setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { Navigationbar } from "../components/Navbar";
import Swal from "sweetalert2";

const ProfileEdit = () => {
  const [inputDisabled, setInputDisabled] = useState(true);
  const [editButtonText, setEditButtonText] = useState("Edit Profil");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditProfile = () => {
    if (inputDisabled) {
      setInputDisabled(false);
      setEditButtonText("Simpan");
    } else {
      setInputDisabled(true);
      setEditButtonText("Edit Profil");
      try {
        const updatedProfileData = {
          first_name: firstName,
          last_name: lastName,
        };
        dispatch(editProfileAsync(updatedProfileData));
      } catch (error) {
        console.log("Error updating profile:", error);
      }
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuthToken(localStorage.removeItem("authToken"))
    navigate("/");
  };

  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
      if (file.size <= 100 * 1024 && allowedImageTypes.includes(file.type)) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          dispatch(editProfileImageAsync(formData));
          Swal.fire({
            position:'center',
            icon: 'success',
            title: 'Sukses Mengubah Foto',
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          console.log("Error updating profile image:", error);
        }
      } else {
        Swal.fire({
          position:'center',
          icon: 'error',
          title: 'Gagal Mengubah Foto',
          text: `maksimal size Foto 100kb`,
          confirmButtonColor: "red",
        });
      }
    
  };

  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.data);
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);
  useEffect(() => {
    if (profiles) {
      setFirstName(profiles?.first_name);
      setLastName(profiles?.last_name);
    }
  }, [profiles]);

  return (
    <>
    <Navigationbar/>
      <div className="text-center">
        <Image src={profiles?.profile_image === "https://minio.nutech-integrasi.app/take-home-test/null" ? (
              profile
              ) : (
              profiles?.profile_image
                )} />
        <label htmlFor="imageInput">
          <FontAwesomeIcon icon={faEdit} style={{ cursor: "pointer" }} />
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
        <p className="fs-3 fw-semibold">
          {profiles?.first_name} {profiles?.last_name}
        </p>
      </div>
      <div className="container">
        <Form>
          <Row className="justify-content-center">
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
                  value={profiles?.email}
                  disabled
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={inputDisabled}
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={inputDisabled}
                />
              </InputGroup>
            </Form.Group>
            <div
              className="col-md-8 mb-3 btn btn-danger"
              onClick={handleEditProfile}
            >
              {editButtonText}
            </div>
            {editButtonText === "Edit Profil" && (
              <div
                className="col-md-8 mb-3 btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ProfileEdit;
