namespace Core.Models
{
    public class SendDataModel
    {
        required public double TeplotaV { get; set; } //teplota vzduchu
        required public double Tlak { get; set; }
        required public double Vyska { get; set; }
        required public double Vlhkost { get; set; }
        required public int Svetlo { get; set; }
        //podzemniHodnoty
        required public double TeplotaZ { get; set; } //teplota země
        required public Int16 Voda { get; set; }
        required public string Jmeno {  get; set; }
        public int id {  get; set; }
        public string image {  get; set; }
    }
}
