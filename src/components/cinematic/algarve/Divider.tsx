// section_divider (Algarve 1:1): volle Breite, 1px Haarlinie, 2.22vw Luft o/u.
export function AlgarveDivider() {
  return (
    <div style={{ background: "#f8f7f3", paddingTop: "2.22vw", paddingBottom: "2.22vw" }}>
      <div style={{ paddingLeft: "2vw", paddingRight: "2vw" }}>
        <div style={{ width: "100%", height: "1px", backgroundColor: "#00000029" }} />
      </div>
    </div>
  );
}
