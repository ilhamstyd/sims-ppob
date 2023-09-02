import React, { useEffect} from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {listTransactionAsync} from "../features/ProfileSlice";
import { Rupiah } from "../components/FormatIdr";
import { Navigationbar } from "../components/Navbar";
import ComponentProfile from "../components/ComponentProfile";
import { format, parseISO } from "date-fns";

const ListTransaction = () => {

  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.profile.transaction.data);
  const offset = useSelector((state) => state.profile.offset);
  
  useEffect(() => {
    dispatch(listTransactionAsync(offset));
  }, [dispatch]);

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
          <div>
          {transaction?.records?.length === 0 ? (
            <h1 className="text-center">tidak ada transaksi</h1>
          ) : (
          transaction?.records?.map((datas, i) => (
            <div className="card shadow pt-2 ps-3 mb-3" key={i}>
              <div className="d-flex">
                {datas.description === "Top Up Balance" ? (
                  <p className="fs-4 fw-semibold col-md-6 text-success text-start">
                    +{Rupiah(datas.total_amount)}
                  </p>
                ) : (
                  <p className="fs-4 fw-semibold col-md-6 text-danger text-start">
                    -{Rupiah(datas.total_amount)}
                  </p>
                )}
                <p className="col-md-6 text-end pe-2">{datas.description}</p>
              </div>
              <p className="text-secondary">{format(parseISO(datas.created_on), "dd MMMM yyyy 'pukul' HH:mm") }</p>
            </div>
          )))}
          </div>
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
