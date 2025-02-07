export default function DriveLayout(props: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      {props.children}
    </div>
  );
}
