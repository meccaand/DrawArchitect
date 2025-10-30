import InputPanel from '../InputPanel';

export default function InputPanelExample() {
  return (
    <InputPanel
      onGenerate={(prompt) => console.log('Generate:', prompt)}
      isGenerating={false}
    />
  );
}
