   M S B A M L   `   `   `  ????H  DMultiView App, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null5clr-namespace:MultiViewApp.ViewMultiViewApp.View  5      ?$clr-namespace:MultiViewApp.ViewModelMultiViewApp.ViewModel  5   1       MultiViewApp.View.View2   5      W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35U QWPFToolkit, Version=3.5.40128.1, Culture=neutral, PublicKeyToken=31bf3856ad364e35H 9http://schemas.microsoft.com/winfx/2006/xaml/presentation      5      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      1localclr-namespace:MultiViewApp.View     5      R NOxyPlot.Wpf, Version=2.0.0.0, Culture=neutral, PublicKeyToken=75e952ba404cdbb0 oxyhttp://oxyplot.org/wpf  5      4	viewmodel$clr-namespace:MultiViewApp.ViewModel  61   $	??450??5	   3   .??5
      ?   ? RowDefinitions  5   
   ?? 5      $
??Auto ?6   ?? 5      $??* ?6   ?? 5      $
??Auto ?6   ?? 5      $
??Auto ?6    ? ColumnDefinitions 5   
   ?? 5      $
??Auto ?6   ?? 5      $??* ?6   .+?5   
     OxyPlot.Wpf.PlotView  -   5          Name$ DataPlotView??5      $??1??5      $??1??6$   $??22,10,43,75q?5         Model 5      ?? *DataPlotModel+? 5   
   $??1??6   $??1??6   $??
0,334,0,16q?6,   $??2??6@    5      ?? 5      $
??Auto ?6#   ?? 5      $??* ?6#   ?? 5      $
??Auto ?6#   ?? 5       $
??Auto ?6#   ?? 5!      $
??Auto ?6#   .+?5#      ?? $??0??5$      $??
20,10,0,10q?5%      $??IP address: ??5&      $??Center=?6%   ?? 5'      $??1??5(      $??	0,10,0,10q?5)      $	??100??5*      $
??Left=?5+      ??5,      ?? *	IpAddress+?? 5-      $??2??5.      $??	0,10,0,10q?5/      $??Sample time: ??50      $??Right=?51      $??Center=?6-   ?? 52      $??3??53      $??	0,10,0,10q?54      $	??100??55      $
??Left=?56      ??57      ?? *
SampleTime+?? 58      $??4??59      $??
0,10,20,10q?5:      $	?? ms??5;      $??Right=?5<      $??Center=?6-   5=      ? 5>   
   $??2??6   $??1??6   $??	0,22,0,16q?6,   $??2??6?    5?      ?? 5@      $??* ?6#   ?? 5A      $
??Auto ?6#   ?? 5B      $
??Auto ?6#   ?? 5C      $??* ?6#   .+?5E      ?? $??0??5F      $??30??5G      $	??150??5H      $??
0,10,30,10q?5I      $??START??5K      $??Right=?5L      $??START??6-   ??5J      ?? *StartButton+5L   -   ?? 5M      $??1??5N      $??30??5O      $	??150??5P      $??
0,10,15,10q?5Q      $
??STOP??5R   0   ??6   ?? *
StopButton+60   ?? 5S      $??2??5T      $??30??5U      $	??150??5V      $??
15,10,0,10q?5W      $
??Left=?5X   8   $??UPDATE CONFIG??6S   ??6   ?? *UpdateConfigButton+6S   ?? 5Y      $??3??5Z      $??30??5[      $	??150??5\      $??
30,10,0,10q?5]      $
??Left=?5^   9   $??DEFAULT CONFIG??6T   ??6   ?? *DefaultConfigButton+6T   5_      5c      5d      