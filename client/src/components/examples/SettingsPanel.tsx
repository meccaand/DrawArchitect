import SettingsPanel from '../SettingsPanel';

export default function SettingsPanelExample() {
  return (
    <SettingsPanel
      lineThickness={2}
      onLineThicknessChange={(value) => console.log('Line thickness:', value)}
      showGrid={true}
      onShowGridChange={(value) => console.log('Show grid:', value)}
      showAxis={true}
      onShowAxisChange={(value) => console.log('Show axis:', value)}
      onExport={(format, resolution) => console.log('Export:', format, resolution)}
    />
  );
}
