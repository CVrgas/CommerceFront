function FullPageLoader({
  header,
  message,
}: {
  header?: string;
  message?: string;
}) {
  return (
    <>
      <div className="full-page-loader">
        <div className="loader">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="loader-content">
          {header && (
            <h1 className="text-5xl font-semibold text-gray-800">{header}</h1>
          )}
          {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default FullPageLoader;
