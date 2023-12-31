import React from "react";
import { Link } from "react-router-dom";
import '../App.css'

export const Publications = () => {
  return (
    <>
      <hr />
      <div style={{ width: "100%", marginBottom: "30px" }}>
        <p
          style={{ marginLeft: "10px", fontSize: "20px", marginBottom: "20px" }}
        >
          PUBLICATIONS
        </p>
        <div
        className="publicationContainer"
          // style={{
          //   display: "grid",
          //   gridTemplateColumns: "repeat(3,30%)",
          //   justifyContent: "space-around",
          //   textAlign: "center",
          // }}
        >
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/2095/4219/products/MGGS-Cristina-Iglesias-Hondulea.jpg?v=1675364329&width=823"
              alt=""
            />
            <p
              style={{
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.547)",
                marginTop: "15px",
              }}
            >
              PUBLICATIONS
            </p>
            <hr />
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
              Cristina Iglesias: Hondalea
            </h2>
            <p style={{ fontSize: "13px", marginTop: "20px" }}>
              The lighthouse on the island of Santa Clara in <br />
              Donostia / San Sebastián stood empty for many years until <br />
              Cristina Iglesias transformed it into a breath-taking sculptural
              work
              <br /> that opened to the...
            </p>
          </div>
          <Link to={"/shop/5"}>
            <div>
              <img
                src="https://cdn.shopify.com/s/files/1/2095/4219/products/MGGS_GabrielOrozco_CorplegadosandParticles_Cover.jpg?v=1669233423&width=823"
                alt=""
              />
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(0, 0, 0, 0.547)",
                  marginTop: "15px",
                }}
              >
                PUBLICATIONS
              </p>
              <hr />
              <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
                Cristina Iglesias: Hondalea
              </h2>
              <p style={{ fontSize: "13px", marginTop: "20px" }}>
                The lighthouse on the island of Santa Clara in <br />
                Donostia / San Sebastián stood empty for many years until <br />
                Cristina Iglesias transformed it into a breath-taking sculptural
                work
                <br /> that opened to the...
              </p>
            </div>
          </Link>
          <div>
            <img
              src="https://cdn.shopify.com/s/files/1/2095/4219/products/MGG_Shop_GabrielOrozco_AnIsland_Cover.jpg?v=1673030906&width=823"
              alt=""
            />
            <p
              style={{
                fontSize: "13px",
                color: "rgba(0, 0, 0, 0.547)",
                marginTop: "15px",
              }}
            >
              PUBLICATIONS
            </p>
            <hr />
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
              Cristina Iglesias: Hondalea
            </h2>
            <p style={{ fontSize: "13px", marginTop: "20px" }}>
              The lighthouse on the island of Santa Clara in Donostia / San
              Sebastián stood empty for many years until Cristina Iglesias
              transformed it into a breath-taking sculptural work that opened to
              the...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
