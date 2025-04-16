interface LoadingProp {
  label: string;
  width: number;
  height: number;
  color: string;
}

export const Loading = ({ label, width, height, color }: LoadingProp) => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        id="Layer_1"
        width={width}
        height={height}
        fill={color}
        version="1.1"
        viewBox="0 0 330 330"
        className="animate-spin"
      >
        <g id="SVGRepo_iconCarrier">
          <g id="XMLID_2_">
            <path
              id="XMLID_4_"
              d="M97.5 165c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15s6.716 15 15 15h60c8.284 0 15-6.716 15-15"
            ></path>
            <path
              id="XMLID_5_"
              d="M307.5 150h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15"
            ></path>
            <path
              id="XMLID_6_"
              d="M172.5 90c8.284 0 15-6.716 15-15V15c0-8.284-6.716-15-15-15s-15 6.716-15 15v60c0 8.284 6.716 15 15 15"
            ></path>
            <path
              id="XMLID_7_"
              d="M172.501 240c-8.284 0-15 6.716-15 15v60c0 8.284 6.716 15 15 15s15-6.716 15-15v-60c0-8.284-6.716-15-15-15"
            ></path>
            <path
              id="XMLID_8_"
              d="M77.04 48.327c-5.856-5.858-15.354-5.857-21.213 0-5.858 5.858-5.858 15.355 0 21.213l42.427 42.428a14.95 14.95 0 0 0 10.606 4.394c3.838 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213z"
            ></path>
            <path
              id="XMLID_9_"
              d="M246.746 218.034c-5.857-5.857-15.355-5.857-21.213 0s-5.857 15.355 0 21.213l42.428 42.426a14.95 14.95 0 0 0 10.607 4.393c3.839 0 7.678-1.465 10.606-4.393 5.858-5.858 5.858-15.355 0-21.213z"
            ></path>
            <path
              id="XMLID_10_"
              d="M98.254 218.034 55.828 260.46c-5.858 5.858-5.858 15.355 0 21.213a14.95 14.95 0 0 0 10.607 4.393 14.95 14.95 0 0 0 10.606-4.393l42.426-42.426c5.858-5.858 5.858-15.355 0-21.213s-15.356-5.858-21.213 0"
            ></path>
          </g>
        </g>
      </svg>
      <p className={`text-${color}-600`}>{label}...</p>
    </div>
  );
};
