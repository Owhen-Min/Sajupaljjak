import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const RangeSlider = ({ min = 0, max = 100, onChange }) => {
  const handleChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <div className="px-4 py-2">
      <Slider
        range
        min={min}
        max={max}
        defaultValue={[min, max]}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: '#ef4444' }]} // red-500
        handleStyle={[
          { backgroundColor: '#ef4444', borderColor: '#ef4444' },
          { backgroundColor: '#ef4444', borderColor: '#ef4444' }
        ]}
        railStyle={{ backgroundColor: '#e5e7eb' }} // gray-200
      />
    </div>
  );
};

export default RangeSlider;