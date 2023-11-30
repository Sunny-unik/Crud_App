import axios from "axios";

export async function fetchStudentsData(url, setStudents) {
  return new Promise((resolve) =>
    axios
      .get(url)
      .then((res) => {
        if (url.includes("?id=") && !res.data.data)
          throw new Error("Invalid user Id");
        setStudents((s) => {
          return { ...s, data: res.data.data };
        });
      })
      .catch((error) =>
        setStudents((s) => {
          return { ...s, error: error };
        })
      )
      .finally(() => {
        setStudents((s) => {
          return { ...s, loading: false };
        });
        resolve();
      })
  );
}
