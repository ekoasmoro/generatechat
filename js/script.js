// Ambil elemen DOM
const shiftSelect = document.getElementById("shift");
const operatorSelect = document.getElementById("operator");
const resiInput = document.getElementById("resi");
const methodSelect = document.getElementById("method");
const generateButton = document.querySelector(".button-group button:nth-child(1)");
const resetButton = document.querySelector(".button-group button:nth-child(2)");
const hasilTextarea = document.getElementById("hasil");
const invalidPopup = document.querySelector(".invalid-popup");
const copyPopup = document.querySelector(".copy-popup");
const copyBtn = document.getElementById("copyBtn");

invalidPopup.style.display = "none";
copyPopup.style.display = "none";

// Kelas utama
class Main {
  constructor(shift, name, idResi) {
    this.shift = shift;
    this.name = name;
    this.idResi = idResi;
    this.hasilCheck = "";
  }

  pushResi() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Mohon maaf sebelumnya kak, terkait kendala proses pengiriman pada resi ${this.idResi} yang stuck atau belum update, ${this.name} bantu buatkan laporanya ke ekspedisi ${this.hasilCheck} pusat untuk segera proses kembali pengirimanya`;
  }

  pushReturn() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Mohon maaf sebelumnya kak, terkait kendala proses pengiriman return pada resi ${this.idResi}, ${this.name} bantu buatkan laporanya ke ekspedisi ${this.hasilCheck} pusat untuk segera proses kembali pengirimanya returnya ya kak`;
  }

  pengirimanUlang() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Mohon maaf sebelumnya kak, terkait kendala proses pengiriman resi ${this.idResi} sudah dilakukan percobaan pengiriman ya kak. Apakah bisa dibantu untuk konfirmasi kembali ke penerima kak, bahwa penerima tidak menolak paket dan masih menunggu paketnya untuk diantar.

Apabila sudah konfirmasi bisa dibantu screenshotkan dan dilampirkan di livechat, guna ${this.name} bantu buatkan laporanya ke ekspedisi ${this.hasilCheck} pusat untuk bisa diantar ulang paketnya`;
  }

  pushPod() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Baik kak, untuk resi ${this.idResi}, ${this.name} bantu buatkan laporanya ke ekspedisi ${this.hasilCheck} pusat untuk segera proses update POD atau diterima`;
  }

  pengirimanReturn() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Mohon maaf sekali ya kak, untuk pengiriman resi ${this.idResi} belum berhasil diterima, kurir sudah berupaya untuk melakukan beberapa kali pengantaran hingga batas maksimal percobaan pengantaran.

Namun apabila proses pengiriman tidak sesuai prosedur kakak bisa ajukan klaim ya kak`;
  }

  bantuKlaim() {
    return `Halo selamat ${this.shift} kak, dengan ${this.name} disini

Baik kak, untuk resi ${this.idResi}, ${this.name} bantu ajukan klaim ke Tim terkait ya kak, mohon kesediaan waktu untuk menunggu updatenya kembali`;
  }
}

// Subclass untuk validasi ekspedisi
class Generate extends Main {
  constructor(shift, name, idResi) {
    super(shift, name, idResi);
  }

  checkId() {
    const id = this.idResi.toUpperCase();
    const idNinja = id.substring(0, 8);
    const idSap = id.substring(0, 7);
    const idJnt = id.substring(0, 2);
    const idIdex = id.substring(0, 3);

    if (idNinja === "KOMRCKOM") {
      this.hasilCheck = "Ninja";
    } else if (idSap === "KOMSHIP") {
      this.hasilCheck = "SAP";
    } else if (idJnt === "JO") {
      this.hasilCheck = "JNT";
    } else if (idIdex === "IDE") {
      this.hasilCheck = "ID Express";
    } else if (id.length === 16) {
      this.hasilCheck = "JNE";
    } else if (id.length === 12 && idJnt !== "JO") {
      this.hasilCheck = "Sicepat";
    } else {
      throw new Error("❌ Resi Tidak Valid!");
    }
  }
}

// Tombol generate
generateButton.addEventListener("click", () => {
  const shift = shiftSelect.value;
  const name = operatorSelect.value;
  const resi = resiInput.value.trim();
  const method = methodSelect.options[methodSelect.selectedIndex].text;

  const generate = new Generate(shift, name, resi);

  try {
    generate.checkId();

    let result = "";

    switch (method) {
      case "Push Pengiriman":
        result = generate.pushResi();
        break;
      case "Push Return":
        result = generate.pushReturn();
        break;
      case "Pengiriman Ulang":
        result = generate.pengirimanUlang();
        break;
      case "Laporan POD":
        result = generate.pushPod();
        break;
      case "Pengiriman di Return":
        result = generate.pengirimanReturn();
        break;
      case "Bantu Klaim":
        result = generate.bantuKlaim();
        break;
      default:
        result = "Template tidak dikenali.";
    }

    hasilTextarea.value = result;
    invalidPopup.style.display = "none";
  } catch (error) {
    hasilTextarea.value = "";
    invalidPopup.style.display = "block";
  }
});

// Tombol reset hanya reset metode template
resetButton.addEventListener("click", () => {
  methodSelect.selectedIndex = 0;
  resiInput.value = "";
  hasilTextarea.value = "";
  invalidPopup.style.display = "none";
  copyPopup.style.display = "none";
});

// Tombol copy
copyBtn.addEventListener("click", () => {
  hasilTextarea.select();
  document.execCommand("copy");
  copyPopup.style.display = "block";

  setTimeout(() => {
    copyPopup.style.display = "none";
  }, 2000);
});
