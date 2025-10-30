import RoomDimensions from '../RoomDimensions';

export default function RoomDimensionsExample() {
  return (
    <RoomDimensions
      width={15}
      length={15}
      height={9}
      onWidthChange={(value) => console.log('Width:', value)}
      onLengthChange={(value) => console.log('Length:', value)}
      onHeightChange={(value) => console.log('Height:', value)}
    />
  );
}
