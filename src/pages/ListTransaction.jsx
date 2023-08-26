import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import profile_photos from "../assets/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { incrementOffset, listTransactionAsync} from "../features/ProfileSlice";
import { Rupiah } from "../components/FormatIdr";
import { Navigationbar } from "../components/Navbar";
import ComponentProfile from "../components/ComponentProfile";

const ListTransaction = () => {

  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.profile.merges.transaction);
  const offset = useSelector((state) => state.profile.merges.offset);
  
  console.log("lagi mau dibenerin :", transaction);
  useEffect(() => {
    dispatch(listTransactionAsync(offset));
  }, []);

  const handleShowMore = () => {
    const newOffset = offset + 5;
    dispatch(listTransactionAsync(newOffset));
  };
  return (
    <div>
      <Navigationbar />
      <Container>
        <ComponentProfile />
        <div className="row mt-4">
          <p style={{ fontWeight: "600" }}>Semua Transaksi</p>
          {transaction?.map((datas, i) => (
            <div className="card shadow pt-2 ps-3 mb-3" key={i}>
              <div className="d-flex">
                {datas?.data?.records?.description === "Top Up Balance" ? (
                  <p className="fs-4 fw-semibold col-md-6 text-success text-start">
                    +{Rupiah(datas?.data?.records?.total_amount)}
                  </p>
                ) : (
                  <p className="fs-4 fw-semibold col-md-6 text-danger text-start">
                    -{Rupiah(datas?.data?.records?.total_amount)}
                  </p>
                )}
                <p className="col-md-6 text-end">{datas?.data?.records?.description}</p>
              </div>
              <p className="text-secondary">{datas?.data?.records.created_on}</p>
            </div>
          ))}
            <div className="my-5 text-center fw-bold text-danger"
            onClick={handleShowMore}
            style={{ cursor: "pointer" }}> Show more
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ListTransaction;
