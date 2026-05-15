import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const testResult = useSelector((state) => state.student.testResult.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  useEffect(() => {
    if (testResult?.length !== 0) setLoading(false);
  }, [testResult]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, [dispatch]);

  return (
    <div className="flex-1 min-w-0 mt-3">
      <div className="space-y-5">
        <div className="flex text-muted items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className="mr-0 md:mr-10 surface-card rounded-xl p-4 sm:p-6 h-auto md:h-[29.5rem]">
          <div className="min-w-0">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError}
                </p>
              )}
            </div>
            {!loading && Object.keys(error).length === 0 && testResult?.length !== 0 && (
              <div className={classes.adminData}>
                  <div className="grid grid-cols-8">
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Sr no.
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Subject Code
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Subject Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Test
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Marks Obtained
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Total Marks
                    </h1>
                  </div>
                  {testResult?.map((res, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.subjectCode}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.subjectName}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.test}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.marks}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.totalMarks}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
