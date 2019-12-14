const decideColor = data => '#FFF';

export default {
  option: (base, context) => ({
    ...base,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgb(223, 229, 242)',
    },
    borderBottom: '1px dotted pink',
    color: context.isSelected ? 'red' : 'blue',
    overflow: 'hidden',
  }),
  control: base => ({
    ...base,
  }),
  valueContainer: base => ({
    ...base,
    maxHeight: '100%',
    overflow: 'hidden',
    border: 'none',
  }),
  menu: base => ({
    ...base,
    marginTop: '0px',
    marginBottom: '10px',
    borderRadius: '0px 4px 0px 0px',
    boxShadow: 'none',
    backgroundColor: '#a3c9d6',
  }),
  menuList: base => ({
    borderBottom: '1px solid #d6c851',
  }),

  multiValue: styles => ({
    ...styles,
    backgroundColor: '#696969',
    color: 'white',
  }),
  multiValueLabel: (styles, context) => ({
    ...styles,
    color: decideColor(context.data),
  }),
  singleValue: (base, state) => {
    const opacity = 1;
    const transition = 'opacity 300ms';
    return { ...base, opacity, transition };
  },
};
