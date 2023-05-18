import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GamesService } from 'src/app/games.service';
import { Game } from 'src/app/models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})

export class DisplayComponent implements OnInit {
  gameSvc = inject(GamesService);
  obs$!: Observable<Game[]>;
  form!: FormGroup;
  fb = inject(FormBuilder);
  limitInput = new Subject<number>();
  currentPage: number = 1;
  totalPages!: number;
  games!: Game[];

  ngOnInit(): void {
    this.form = this.createForm();
  }

  /* This method calls the server side api and gets
  an Observable<Game[]> based on the form input 'limit'. It is
  then subscribed to the returned observable and assigned the
  emitted games array to this.games. It then calculates the total
  pages by dividing the length of games array based on the form
  input 'pageSize'. updatePage() method is then called with the 
  form input 'pageSize'. */
  getBGames(limit: number) {
    this.gameSvc.getGames(limit).subscribe((games) => {
      this.games = games;
      this.totalPages = Math.ceil(games.length / this.form.value.pageSize);
      console.info('old totalpage: ', this.totalPages)
      console.info('old pagesize: ', this.form.value.pageSize)
      this.updatePage(this.form.value.pageSize);
    });
  }

  /* This method allows to update the page by slicing the games
  array. Start index is calculated by multiplying the form input
  'pageSize' with the value of (currentPage - 1). End index is
  calculated by multiplying the form input 'pageSize' with the
  currentPage. This is then assigned to the observable called obs$. */
  updatePage(pageSize: number) {
    const totalPages = Math.ceil(this.games.length / this.form.value.pageSize);
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }
    this.obs$ = of(
      this.games.slice(
        (this.currentPage - 1) * pageSize,
        this.currentPage * pageSize
      )
    );
  }

  nextPage() {
    const totalPages = Math.ceil(this.games.length / this.form.value.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage(this.form.value.pageSize);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage(this.form.value.pageSize);
    }
  }

  resetForm() {
    location.reload();
  }

  createForm(): FormGroup {
    return this.fb.group({
      limit: this.fb.control(0),
      pageSize: this.fb.control(5),
    });
  }
}
