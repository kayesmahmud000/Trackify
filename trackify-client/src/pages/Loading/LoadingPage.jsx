

const LoadingPage = () => {
    return (
        <div
        className={` min-h-screen items-center justify-center}
        flex 
        flex-col 
        justify-center 
        items-center `}
      >
       <span className="loading loading-ring loading-xl"></span>
      </div>
    );
};

export default LoadingPage;