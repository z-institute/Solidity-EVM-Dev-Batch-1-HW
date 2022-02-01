import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 460 99" {...props}>
      <path
        d="M4.35059 81.5283H12.041V26.1572H4.35059V22.7295H50.0098V26.1572H42.3633V81.5283H56.3379L67.3682 61.5332H70.3564V85H4.35059V81.5283ZM177.539 53.8428C177.539 50.9424 177.832 48.1152 178.418 45.3613C179.033 42.6074 179.971 40.0146 181.23 37.583C182.52 35.1514 184.16 32.9248 186.152 30.9033C188.145 28.8818 190.532 27.1387 193.315 25.6738C196.099 24.209 199.307 23.0811 202.939 22.29C206.572 21.4697 210.659 21.0596 215.2 21.0596C219.741 21.0596 223.828 21.4697 227.461 22.29C231.094 23.0811 234.302 24.209 237.085 25.6738C239.897 27.1387 242.3 28.8818 244.292 30.9033C246.284 32.9248 247.91 35.1514 249.17 37.583C250.43 40.0146 251.353 42.6074 251.938 45.3613C252.554 48.1152 252.861 50.9424 252.861 53.8428C252.861 56.7432 252.554 59.585 251.938 62.3682C251.353 65.1221 250.43 67.7148 249.17 70.1465C247.91 72.5781 246.284 74.8047 244.292 76.8262C242.3 78.8477 239.897 80.5908 237.085 82.0557C234.302 83.5205 231.094 84.6484 227.461 85.4395C223.828 86.2598 219.741 86.6699 215.2 86.6699C210.659 86.6699 206.572 86.2598 202.939 85.4395C199.307 84.6484 196.099 83.5205 193.315 82.0557C190.532 80.5908 188.145 78.8477 186.152 76.8262C184.16 74.8047 182.52 72.5781 181.23 70.1465C179.971 67.7148 179.033 65.1221 178.418 62.3682C177.832 59.6143 177.539 56.7725 177.539 53.8428ZM215.2 83.6377C216.724 83.6377 217.983 83.1836 218.979 82.2754C220.005 81.3672 220.825 79.7852 221.44 77.5293C222.056 75.2441 222.48 72.1973 222.715 68.3887C222.979 64.5508 223.11 59.7021 223.11 53.8428C223.11 48.0127 222.979 43.1934 222.715 39.3848C222.48 35.5469 222.056 32.5 221.44 30.2441C220.825 27.959 220.005 26.3623 218.979 25.4541C217.983 24.5459 216.724 24.0918 215.2 24.0918C213.677 24.0918 212.402 24.5459 211.377 25.4541C210.381 26.3623 209.575 27.959 208.96 30.2441C208.374 32.5 207.949 35.5469 207.686 39.3848C207.451 43.1934 207.334 48.0127 207.334 53.8428C207.334 59.7021 207.451 64.5508 207.686 68.3887C207.949 72.1973 208.374 75.2441 208.96 77.5293C209.575 79.7852 210.381 81.3672 211.377 82.2754C212.402 83.1836 213.677 83.6377 215.2 83.6377ZM262.397 81.5283H270.088V26.1572H262.397V22.7295H313.066C317.373 22.7295 321.094 23.2568 324.229 24.3115C327.363 25.3369 329.956 26.7578 332.007 28.5742C334.058 30.3906 335.566 32.5586 336.533 35.0781C337.529 37.5684 338.027 40.2783 338.027 43.208C338.027 46.167 337.456 48.877 336.313 51.3379C335.2 53.7695 333.545 55.8643 331.348 57.6221C329.18 59.3506 326.484 60.6982 323.262 61.665C320.068 62.6025 316.392 63.0713 312.231 63.0713H300.41V81.5283H308.057V85H262.397V81.5283ZM300.41 59.9072C302.109 59.9072 303.56 59.5264 304.761 58.7646C305.962 57.9736 306.929 56.875 307.661 55.4688C308.423 54.0625 308.965 52.3779 309.287 50.415C309.639 48.4521 309.814 46.2695 309.814 43.8672C309.814 40.791 309.639 38.125 309.287 35.8691C308.936 33.584 308.379 31.709 307.617 30.2441C306.885 28.7793 305.918 27.6953 304.717 26.9922C303.545 26.2598 302.109 25.8936 300.41 25.8936V59.9072ZM347.256 61.0938H350.2C350.933 62.5293 351.841 64.082 352.925 65.752C354.009 67.3926 355.283 69.0332 356.748 70.6738C358.213 72.3145 359.883 73.8965 361.758 75.4199C363.633 76.9141 365.728 78.2324 368.042 79.375C370.356 80.5176 372.905 81.4404 375.688 82.1436C378.472 82.8174 381.519 83.1543 384.829 83.1543C385.796 83.1543 386.88 83.1104 388.081 83.0225C389.282 82.9053 390.41 82.6855 391.465 82.3633C392.52 82.0117 393.398 81.5283 394.102 80.9131C394.834 80.2686 395.2 79.4189 395.2 78.3643C395.2 77.251 394.731 76.2695 393.794 75.4199C392.886 74.541 391.494 73.7061 389.619 72.915C387.744 72.0947 385.371 71.2744 382.5 70.4541C379.658 69.6338 376.304 68.7109 372.437 67.6855C363.823 65.459 357.437 62.3535 353.276 58.3691C349.146 54.3555 347.08 49.4629 347.08 43.6914C347.08 40.0879 347.812 36.8799 349.277 34.0674C350.771 31.2549 352.793 28.8965 355.342 26.9922C357.92 25.0586 360.923 23.5938 364.351 22.5977C367.808 21.5723 371.484 21.0596 375.381 21.0596C377.373 21.0596 379.453 21.2354 381.621 21.5869C383.818 21.9385 385.957 22.4219 388.037 23.0371C390.117 23.6523 392.08 24.3994 393.926 25.2783C395.771 26.1279 397.383 27.0654 398.76 28.0908L405.396 21.6748H408.428V40.791H405.659C404.37 38.4766 402.715 36.3232 400.693 34.3311C398.672 32.3389 396.357 30.6104 393.75 29.1455C391.143 27.6807 388.257 26.5234 385.093 25.6738C381.929 24.8242 378.574 24.3994 375.029 24.3994C374.355 24.3994 373.491 24.4287 372.437 24.4873C371.382 24.5166 370.342 24.6631 369.316 24.9268C368.32 25.1904 367.456 25.6152 366.724 26.2012C365.991 26.7578 365.625 27.5488 365.625 28.5742C365.625 30.2441 367.134 31.8555 370.151 33.4082C373.198 34.9316 377.725 36.4844 383.73 38.0664C386.279 38.7402 388.74 39.458 391.113 40.2197C393.486 40.9521 395.698 41.8018 397.749 42.7686C399.829 43.7061 401.704 44.79 403.374 46.0205C405.073 47.2217 406.523 48.6426 407.725 50.2832C408.926 51.9238 409.849 53.7988 410.493 55.9082C411.167 58.0176 411.504 60.4492 411.504 63.2031C411.504 66.3965 410.918 69.4141 409.746 72.2559C408.574 75.0977 406.816 77.5879 404.473 79.7266C402.158 81.8652 399.272 83.5645 395.815 84.8242C392.358 86.0547 388.359 86.6699 383.818 86.6699C381.328 86.6699 378.984 86.4795 376.787 86.0986C374.59 85.7178 372.451 85.1465 370.371 84.3848C368.32 83.623 366.284 82.6709 364.263 81.5283C362.241 80.3564 360.161 78.9941 358.022 77.4414L350.552 85.835H347.256V61.0938Z" fill="black"
      />
      <path d="M102.769 54.5C118.923 30.1 135.077 30.1 151.231 54.5M102.769 54.5C118.923 78.9 135.077 78.9 151.231 54.5M102.769 54.5L97.3846 48.4C117.128 24 135.974 24 153.923 48.4L162 60.6M151.231 54.5L156.615 60.6C136.872 85 118.026 85 100.077 60.6L92 48.4M92 48.4V60.6C115.333 93.1333 138.667 93.1333 162 60.6M92 48.4C115.333 15.8667 138.667 15.8667 162 48.4V60.6" stroke="black" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);