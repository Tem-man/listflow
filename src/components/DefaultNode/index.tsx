import sty from "./index.module.css";
const LoadingComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.grayText}>Loading...</div>
  </div>
);
const EmptyComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.grayText}>No Data</div>
  </div>
);
const LoadingMoreComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.grayText}>Loading More...</div>
  </div>
);
const InitialErrorComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.redText}>Loading failed, please try again later</div>
  </div>
);
const ErrorComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.redText}>Loading failed, please try again later</div>
  </div>
);
const NoMoreComponent = (
  <div className={sty.defaultNode}>
    <div className={sty.grayText}>No More Data</div>
  </div>
);

export { LoadingComponent, EmptyComponent, LoadingMoreComponent, InitialErrorComponent, ErrorComponent, NoMoreComponent };
