// src/components/Main.tsx
const rectangles = [
    {
        key: "Rectangle8",
        className:
            "Rectangle8 w-[947px] h-56 left-[641px] top-[86px] absolute bg-white/10 rounded-[30px] border-[5px] border-black",
    },
    {
        key: "Rectangle6",
        className:
            "Rectangle6 w-[1210px] h-24 left-[476px] top-[1458px] absolute bg-white rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black",
    },
    {
        key: "Rectangle1",
        className:
            "Rectangle1 w-[1052px] h-[936px] left-[53px] top-[468px] absolute bg-white rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[5px] border-black",
    },
    {
        key: "Rectangle2",
        className:
            "Rectangle2 w-[1052px] h-[936px] left-[1139px] top-[468px] absolute bg-white rounded-[30px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[5px] border-black",
    },
    {
        key: "Rectangle4",
        className:
            "Rectangle4 w-[485px] h-24 left-[1448px] top-[1255px] absolute bg-white rounded-[50px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-[3px] border-black",
    },
    {
        key: "Rectangle5",
        className:
            "Rectangle5 w-60 h-24 left-[1729px] top-[1454px] absolute bg-white rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-black",
    },
    {
        key: "Rectangle7",
        className:
            "Rectangle7 w-60 h-24 left-[1729px] top-[1570px] absolute bg-white rounded-[100px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-black",
    },
];

const texts = [
    {
        key: "UploadedContract",
        className:
            "UploadedContract w-[734px] h-10 left-[404px] top-[411px] absolute justify-start text-black text-4xl font-bold font-['Noto_Sans_JP']",
        children: "Uploaded Contract",
    },
    {
        key: "AnalysisAndSuggestions",
        className:
            "AnalysisAndSuggestions w-[784px] h-12 left-[1423px] top-[408px] absolute justify-start text-black text-4xl font-bold font-['Noto_Sans_JP']",
        children: "Analysis and Suggestions",
    },
    {
        key: "PdfDocxTxt",
        className:
            "PdfDocxTxt w-80 h-12 left-[654px] top-[317px] absolute justify-start text-black text-4xl font-normal font-['Noto_Sans_JP']",
        children: "PDF, DOCX, TXT",
    },
    {
        key: "ClickHereToUploadContract",
        className:
            "ClickHereToUploadContract w-[871px] h-24 left-[679px] top-[157px] absolute justify-start text-black text-6xl font-normal font-['Noto_Sans_JP']",
        children: (
            <>
                Click here to upload contract
                <br />
            </>
        ),
    },
    {
        key: "DownloadSummary",
        className:
            "DownloadSummary w-96 h-20 left-[1487px] top-[1272px] absolute justify-start text-black text-4xl font-bold font-['Noto_Sans_JP']",
        children: (
            <>
                Download Summary
                <br />
            </>
        ),
    },
    {
        key: "Complex",
        className:
            "Complex w-56 h-16 left-[511px] top-[1476px] absolute justify-start text-black text-5xl font-normal font-['Noto_Sans_JP']",
        children: "Complex",
    },
    {
        key: "Basic",
        className:
            "Basic w-56 h-20 left-[1511px] top-[1472px] absolute justify-start text-black text-5xl font-normal font-['Noto_Sans_JP']",
        children: "Basic",
    },
    {
        key: "Formal",
        className:
            "Formal w-80 h-14 left-[1775px] top-[1476px] absolute justify-start text-black text-5xl font-normal font-['Noto_Sans_JP']",
        children: "Formal",
    },
    {
        key: "Modes",
        className:
            "Modes w-96 h-36 left-[53px] top-[1454px] absolute justify-start text-black text-8xl font-normal font-['Noto_Sans_JP'] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]",
        children: (
            <>
                MODES
                <br />
            </>
        ),
    },
    {
        key: "Casual",
        className:
            "Casual w-48 h-14 left-[1775px] top-[1592px] absolute justify-start text-black text-5xl font-normal font-['Noto_Sans_JP']",
        children: "Casual",
    },
];

const ellipses = [
    {
        key: "Ellipse2",
        left: 991,
        top: 1490,
        width: 39,
        height: 39,
        fill: "white",
        stroke: "black",
    },
    {
        key: "Ellipse5",
        left: 757,
        top: 1480,
        width: 57,
        height: 57,
        fill: "black",
    },
    {
        key: "Ellipse4",
        left: 1240,
        top: 1489,
        width: 39,
        height: 39,
        fill: "white",
        stroke: "black",
    },
    {
        key: "Ellipse3",
        left: 1448,
        top: 1489,
        width: 39,
        height: 39,
        fill: "white",
        stroke: "black",
    },
];

const frames = [
    {
        key: "Frame1",
        left: 2197,
        top: 1046,
    },
    {
        key: "Frame2",
        left: 2197,
        top: 1046,
    },
    {
        key: "Frame3",
        left: 2197,
        top: 1046,
    },
];

export default function Main() {
    return (
        <div
            data-layer="Main"
            className="Main w-[2242px] h-[1709px] relative bg-white overflow-hidden"
        >
            {/* Rectangles */}
            {rectangles.map((rect) => (
                <div key={rect.key} data-layer={rect.key} className={rect.className} />
            ))}

            {/* Texts */}
            {texts.map((text) => (
                <div
                    key={text.key}
                    data-layer={text.key.replace(/([A-Z])/g, " $1").trim()}
                    className={text.className}
                >
                    {text.children}
                </div>
            ))}

            {/* Line 1 */}
            <div
                data-layer="Line 1"
                className="Line1 w-[695px] h-0 left-[773px] top-[1514px] absolute outline outline-[10px] outline-offset-[-5px] outline-black"
            ></div>

            {/* Ellipses */}
            {ellipses.map((ellipse) => (
                <div
                    key={ellipse.key}
                    data-svg-wrapper
                    data-layer={ellipse.key}
                    className={`${ellipse.key} left-[${ellipse.left}px] top-[${ellipse.top}px] absolute`}
                >
                    <svg
                        width={ellipse.width}
                        height={ellipse.height}
                        viewBox={`0 0 ${ellipse.width} ${ellipse.height}`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx={ellipse.width / 2}
                            cy={ellipse.height / 2}
                            r={ellipse.width / 2 - (ellipse.stroke ? 0.5 : 0)}
                            fill={ellipse.fill}
                            stroke={ellipse.stroke}
                        />
                    </svg>
                </div>
            ))}

            {/* Polygon */}
            <div
                data-svg-wrapper
                data-layer="Polygon 1"
                className="Polygon1 left-[763px] top-[1582px] absolute"
            >
                <svg
                    width="45"
                    height="38"
                    viewBox="0 0 45 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M40.6143 35.5H4.38574L22.5 4.90625L40.6143 35.5Z"
                        fill="white"
                        stroke="black"
                        strokeWidth="5"
                    />
                </svg>
            </div>

            {/* Frames */}
            {frames.map((frame, idx) => (
                <div
                    key={frame.key + idx}
                    data-svg-wrapper
                    data-layer="Frame"
                    className={`Frame left-[${frame.left}px] top-[${frame.top}px] absolute`}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
                            fill="#E3E3E3"
                        />
                    </svg>
                </div>
            ))}

            {/* Line 3 */}
            <div
                data-layer="Line 3"
                className="Line3 w-[2242px] h-0 left-0 top-[1709px] absolute shadow-[0px_10px_20px_0px_rgba(0,0,0,0.25)] outline outline-[3px] outline-offset-[-1.50px] outline-black"
            ></div>
        </div>
    );
}
