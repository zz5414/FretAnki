import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnPracticePage = location.pathname === "/practice";

  // 현재 경로 및 상태 정보 확인
  console.log("Layout - 현재 경로:", location.pathname);
  console.log("Layout - 현재 상태:", location.state);

  // 튜토리얼 페이지에서도 스테이지 데이터 추출
  const stageData = location.state?.stage;

  // Start Practice 버튼 클릭 핸들러
  const handleStartPractice = () => {
    // 스테이지 데이터가 있을 경우 전달
    if (stageData) {
      console.log("Layout - 연습 시작 버튼 클릭, 스테이지 데이터:", stageData);
      navigate("/practice", { state: { stage: stageData } });
    } else {
      console.error("스테이지 데이터가 없습니다");
      navigate("/");
    }
  };

  return (
    <div className="layout flex flex-col h-[100vh] overflow-hidden">
      <header className="toolbar bg-gray-800 text-white p-4 flex items-center justify-between">
        <button
          className="back-button text-white bg-blue-500 px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="ml-4 text-lg font-bold">FretAnki</h1>
        {!isOnPracticePage && (
          <button
            className="start-button text-white bg-green-500 px-4 py-2 rounded"
            onClick={handleStartPractice}
          >
            Start Practice
          </button>
        )}
      </header>
      <main className="content bg-slate-900 flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
