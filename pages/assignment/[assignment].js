// import React, { useState, useEffect } from "react";
// import styles from "../../styles/assignment.module.css";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { matchSorter } from "match-sorter";

// export default function Assignment() {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataPerpage, setDataPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const totalData = 5000;
//   const totalPages = Math.ceil(totalData / dataPerpage);
//   const [loading, setLoading] = useState(false);
//   const offset = (currentPage - 1) * dataPerpage;

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await fetch(
//           `https://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${dataPerpage}`
//         );
//         const data = await response.json();

//         const filteredData = matchSorter(data, searchQuery, {
//           keys: ["title"],
//         });
//         setData(filteredData);
//         setLoading(false);
//       };
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, [offset, dataPerpage, searchQuery]);

//   let PageNumbers = [];

//   for (let i = currentPage - 10; i <= currentPage + 10; i++) {
//     if (i < 1) {
//       continue;
//     }
//     if (i > totalPages) {
//       break;
//     }
//     PageNumbers.push(i);
//   }
//   console.log(currentPage);
//   console.log(dataPerpage);

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }
//   return (
//     <>
//       <div className={styles.container}>
//         <section className={styles.search_section}>
//         <h1>
//             Search :{" "}
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </h1>
//         </section>
//         <div className={styles.grid}>
//           {data &&
//             data.map((item) => {
//               return (
//                 <>
//                   <div key={item.id} className={styles.card}>
//                     <img src={item.thumbnailUrl} alt="" />
//                     <h3>{item.title}</h3>
//                   </div>
//                 </>
//               );
//             })}
//         </div>
//         <div className={styles.number_container}>
//           {PageNumbers.map((number) => {
//                         const numberClassName = number === currentPage ? styles.current_page : styles.pagination_numbers;

//             return (
//               <>
//                 <span className={numberClassName}>
//                   <Link
//                     href={`/assignment/${number}`}
//                     onClick={() => {
//                       setCurrentPage(number);
//                     }}
//                   >
//                     {number}
//                   </Link>
//                 </span>
//               </>
//             );
//           })}
//         </div>
//         <section className={styles.dropdown_section}>
//           <select
//             name=""
//             id=""
//             onChange={(e) => {
//               setDataPerPage(parseInt(e.target.value));
//             }}
//           >
//             <option value="10">10</option>
//             <option value="20">20</option>
//             <option value="50">50</option>
//             <option value="100">100</option>
//           </select>
//         </section>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import styles from "../../styles/assignment.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { matchSorter } from "match-sorter";

export default function Assignment({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerpage, setDataPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  let PageNumbers = [];

  for (let i = currentPage - 10; i <= currentPage + 10; i++) {
    if (i < 1) {
      continue;
    }
    if (i > data.totalPages) {
      break;
    }
    PageNumbers.push(i);
  }

  return (
    <>
      <div className={styles.container}>
        <section className={styles.search_section}>
          <h1>
            Search :{" "}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </h1>
        </section>
        <div className={styles.grid}>
          {data &&
            data.items.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={item.thumbnailUrl} alt="" />
                <h3>{item.title}</h3>
              </div>
            ))}
        </div>
        <div className={styles.number_container}>
          {PageNumbers.map((number) => {
            const numberClassName =
              number === currentPage
                ? styles.current_page
                : styles.pagination_numbers;

            return (
              <span className={numberClassName} key={number}>
                <Link
                  href={`/assignment/${number}`}
                  onClick={() => {
                    setCurrentPage(number);
                  }}
                >
                  {number}
                </Link>
              </span>
            );
          })}
        </div>
        <section className={styles.dropdown_section}>
          <select
            name=""
            id=""
            onChange={(e) => {
              setDataPerPage(parseInt(e.target.value));
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const currentPage = query.page ? parseInt(query.page) : 1;
  const dataPerpage = query.dataPerpage ? parseInt(query.dataPerpage) : 10;
  const offset = (currentPage - 1) * dataPerpage;

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${offset}&_limit=${dataPerpage}`
    );
    const data = await response.json();

    const totalData = 5000;
    const totalPages = Math.ceil(totalData / dataPerpage);

    const filteredData = matchSorter(data, query.searchQuery || "", {
      keys: ["title"],
    });

    return {
      props: {
        data: {
          items: filteredData,
          totalPages,
        },
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: {
          items: [],
          totalPages: 0,
        },
      },
    };
  }
}
