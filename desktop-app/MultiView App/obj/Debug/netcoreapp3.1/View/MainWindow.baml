   M S B A M L   `   `   `  ????H  DMultiView App, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:MultiViewApp.ViewMultiViewApp.View  5   	   ?$clr-namespace:MultiViewApp.ViewModelMultiViewApp.ViewModel  5   	   "    MultiViewApp.View.MainWindow   5   	   W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35U QWPFToolkit, Version=3.5.40128.1, Culture=neutral, PublicKeyToken=31bf3856ad364e35H 9http://schemas.microsoft.com/winfx/2006/xaml/presentation      5   	   R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   1localclr-namespace:MultiViewApp.View     5   	   :	viewmodel$clr-namespace:MultiViewApp.ViewModel     5   	     ? Title$  
MainWindow??5	   	   $	??550??6   $
??1000??6)    ? DataContext 5
      0   *MultiViewApp.ViewModel.MainWindowViewModel  5   
    ? 	Resources 5         	MenuColor ?? Color  
MenuButton ?? 
TargetType ?? Property ?? Value ?? DataType,   &MultiViewApp.ViewModel.View1_ViewModel   MultiViewApp.View.View1,   &MultiViewApp.ViewModel.View2_ViewModel   MultiViewApp.View.View2,   &MultiViewApp.ViewModel.View3_ViewModel   MultiViewApp.View.View3,   &MultiViewApp.ViewModel.View4_ViewModel	   MultiViewApp.View.View4??%>  &	        &	 !     (?? ?     5      *, +)(?? 0    5      *, +)(?? b    5       *, +)(?? ?    5$      *, +)?? 5   
   $ #7386d5??6,   ?? 5   
   " ??6#   .?5      ??  ? ??$ Center=?64   ?? 5       ? ??$ 10q?6'   ?? 5       ? ??$ 10q?6(   ?? 5       ? ??$ 14(?6)   ?? 5       ? ??$	 100??6&   5      ?? 5   
   "  6   .R?5        5      ?? 5   
   "  6   .R?5        5      ?? 5    
   "  6   .R?5!        5"      ?? 5$   
   "  6   .R?5%      	  5&      5)      .??5*      ?  ? ColumnDefinitions 5+   
   ?? 5,      $
??Auto ?6   ?? 5-      $
??431* ?6   ?? 5.      $
??249* ?6   .+?52   
   ?? $??0??6   #??[  6%   .+?53      ?? #??[ 6   ??69   ?? *MenuCommandView1+.??6^   
Start page6j   ?? 54      #??[ 6   ??69   ?? *MenuCommandView2+.??6^   Graphs6f   ?? 55      #??[ 6   ??69   ?? *MenuCommandView3+.??6^   	Sensors6g   ?? 56      #??[ 6   ??69   ?? *MenuCommandView4+.??6^   LED6c   57      ?? 5:   
   $??1??6   $??2??6N   ??6)   ?? *ContentViewModel+6N   5;      5<      