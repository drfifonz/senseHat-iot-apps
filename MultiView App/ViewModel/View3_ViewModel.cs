namespace MultiViewApp.ViewModel
{
    public class View3_ViewModel : BaseViewModel
    {
        public ButtonCommand ButtonCommand { get; set; }

        private int _textSize = 20;
        public int TextSize
        {
            get { return _textSize; }
            set
            {
                if(_textSize != value)
                {
                    _textSize = value;
                    OnPropertyChanged("TextSize");
                }
            }
        }

        public View3_ViewModel()
        {
            ButtonCommand = new ButtonCommand(ButtonClickHandler);
        }

        public void ButtonClickHandler()
        {
            TextSize = (TextSize >= 30) ? 20 : TextSize + 1;
        }
    }
}