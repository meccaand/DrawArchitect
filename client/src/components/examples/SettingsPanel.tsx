import SettingsPanel from '../SettingsPanel';

export default function SettingsPanelExample() {
  return (
    <SettingsPanel
      lineThickness={2}
      onLineThicknessChange={(value) => console.log('Line thickness:', value)}
      showGrid={true}
      onShowGridChange={(value) => console.log('Show grid:', value)}
      roomWidth={15}
      roomLength={15}
      roomHeight={9}
      onRoomWidthChange={(value) => console.log('Room width:', value)}
      onRoomLengthChange={(value) => console.log('Room length:', value)}
      onRoomHeightChange={(value) => console.log('Room height:', value)}
      onExport={(format, resolution) => console.log('Export:', format, resolution)}
    />
  );
}
