import ControlPanel from '@/components/ControlPanel';

export function meta() {
  return [
    { title: 'QR Code Generator' },
    {
      name: 'description',
      content: 'Simple React QR Code Generator for creating customizable QR codes.',
    },
  ];
}

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center py-4">
      <ControlPanel />
    </div>
  );
}
