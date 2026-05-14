export function StaticPage({ src, title }) {
  return (
    <iframe title={title} src={src} style={{ width: "100vw", height: "100vh", border: "none", backgroundColor: "#181818" }} />
  );
}
