function BigBanner(props: BigBanner) {
  const { style } = props;
  const containerClass =
    " w-full lg:h-[400px] flex flex-col lg:flex-row p-5 overflow-hidden rounded-sm";

  return (
    <div className={style.backgroundColor + containerClass}>
      <BigBannerBody {...props} />
    </div>
  );
}

function BigBannerBody(prop: BigBanner) {
  const { imageUrl, title, body } = prop;
  const { bodyColor, titleColor } = prop.style;
  return (
    <>
      <div className="flex-1 flex flex-col justify-center">
        <h1
          className={
            titleColor + " text-3xl lg:text-8xl font-bold mb-4 lg:w-1/2"
          }
        >
          {title}
        </h1>
        <p className={bodyColor + " text-xl lg:w-2/3 mb-4"}>{body}</p>
        <div className="my-4">
          {prop.link && (
            <a
              href={prop.link}
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Order now
            </a>
          )}
        </div>
      </div>
      <div className="flex-2 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="object-contain max-w-[600px] max-h-[400px]"
          />
        )}
      </div>
    </>
  );
}

export default BigBanner;
