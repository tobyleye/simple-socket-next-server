import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const colors = ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"];

const socket = io();

export default function Home() {
  const [activeColor, setActiveColor] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.on("color", (color) => {
      setActiveColor(color);
    });
  }, []);

  useEffect(() => {
    if (activeColor) {
      document.body.style.backgroundColor = activeColor;
    }
  }, [activeColor]);

  const changeColor = (e) => {
    socket.emit("change_color", e.target.value);
  };

  return (
    <div>
      <Head>
        <title>Simple socket server with next</title>
        <meta name="description" content="a simple socket server with nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="radios">
          {colors.map((col) => {
            return (
              <label key={col} className="radio">
                <input
                  type="radio"
                  name="color"
                  onChange={changeColor}
                  value={col}
                />
                <span
                  style={{
                    "--color": col,
                  }}
                ></span>
              </label>
            );
          })}
        </div>
      </main>

      <style jsx>{`
        .main {
          display: grid;
          min-height: 90vh;
          place-items: center;
        }
        .radios {
          display: flex;
          gap: 20px;
          align-items: center;
          background: white;
          padding: 20px;
          border-radius: 5px;
        }
        .radio input {
          display: none;
        }
        .radio span {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: var(--color);
          border-radius: 99px;
          cursor: pointer;
        }

        .radio input:checked ~ span {
          box-shadow: 0px 0px 0px 2px white, 0px 0px 0px 4px black;
        }
      `}</style>
    </div>
  );
}
