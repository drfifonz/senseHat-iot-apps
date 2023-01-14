using System.Windows.Controls;

namespace MultiViewApp.View
{
    using ViewModel;
    /// <summary>
    /// Interaction logic for View3.xaml
    /// </summary>
    public partial class View3 : UserControl
    {
        public View3()
        {
            InitializeComponent();
            DataContext = new View3_ViewModel();
        }
    }
}
