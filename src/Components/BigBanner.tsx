function BigBanner(props: BigBanner) {
  const { link, style } = props;
  const containerClass =
    " w-full lg:h-[400px] flex flex-col lg:flex-row p-5 overflow-hidden";

  if (link === undefined) {
    return (
      <div className={style.backgroundColor + containerClass}>
        <BigBannerBody {...props} />
      </div>
    );
  }

  return (
    <a
      href={link ? link : "#"}
      className={style.backgroundColor + containerClass}
    >
      <BigBannerBody {...props} />
    </a>
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
        <button className="btn">Order now</button>
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
